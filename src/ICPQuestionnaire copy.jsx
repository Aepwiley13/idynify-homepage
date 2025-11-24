import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from './lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const ICPQuestionnaire = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [currentSection, setCurrentSection] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [saving, setSaving] = useState(false);
  
  // Comprehensive form data structure matching 79 questions
  const [formData, setFormData] = useState({
    // Section 1: Company Information (Questions 1-10)
    companyName: '',
    website: '',
    yearFounded: '',
    companyStage: '',
    employeeCount: '',
    annualRevenue: '',
    fundingStage: '',
    primaryIndustry: '',
    secondaryIndustry: '',
    companyDescription: '',
    
    // Section 2: Product/Service Information (Questions 11-20)
    productName: '',
    productCategory: '',
    productDescription: '',
    uniqueValue: '',
    pricingModel: '',
    averageContractValue: '',
    salesCycle: '',
    competitorsList: '',
    competitiveAdvantage: '',
    productMaturity: '',
    
    // Section 3: Current Customer Base (Questions 21-30)
    totalCustomers: '',
    customerGrowthRate: '',
    customerRetentionRate: '',
    topCustomerIndustries: [],
    averageCustomerSize: '',
    customerGeography: [],
    expansionRate: '',
    churnRate: '',
    npsScore: '',
    customerSuccessStories: '',
    
    // Section 4: Target Market Definition (Questions 31-40)
    targetMarketSize: '',
    targetIndustries: [],
    targetCompanySize: [],
    targetGeography: [],
    targetDepartments: [],
    targetJobTitles: [],
    targetSeniority: [],
    targetTechStack: [],
    targetGrowthStage: [],
    targetBudget: '',
    
    // Section 5: Customer Pain Points & Needs (Questions 41-50)
    primaryPainPoint: '',
    secondaryPainPoints: '',
    currentSolutions: '',
    solutionGaps: '',
    urgencyLevel: '',
    impactOfNotSolving: '',
    desiredOutcomes: '',
    successMetrics: '',
    buyingTriggers: [],
    objections: '',
    
    // Section 6: Buyer Personas (Questions 51-60)
    championPersona: '',
    championTitle: '',
    championGoals: '',
    championChallenges: '',
    decisionMakerPersona: '',
    decisionMakerTitle: '',
    decisionCriteria: '',
    influencers: '',
    buyingCommittee: '',
    approvalProcess: '',
    
    // Section 7: Sales & Marketing (Questions 61-70)
    leadSources: [],
    marketingChannels: [],
    contentTypes: [],
    messagingThemes: '',
    valueProposition: '',
    differentiators: '',
    socialProof: '',
    salesEnablement: '',
    partnerChannels: '',
    communityPresence: '',
    
    // Section 8: Behavioral & Psychographic (Questions 71-79)
    buyingBehavior: '',
    researchProcess: '',
    informationSources: [],
    peerInfluence: '',
    riskTolerance: '',
    innovationAppetite: '',
    brandPreferences: '',
    communicationStyle: '',
    culturalValues: ''
  });

  // Question structure for all 79 questions
  const sections = [
    {
      id: 1,
      title: 'Company Information',
      questions: [
        { id: 1, field: 'companyName', label: 'What is your company name?', type: 'text', required: true },
        { id: 2, field: 'website', label: 'Company website URL', type: 'url', required: true },
        { id: 3, field: 'yearFounded', label: 'Year founded', type: 'number', required: true },
        { id: 4, field: 'companyStage', label: 'Current company stage', type: 'select', 
          options: ['Pre-seed', 'Seed', 'Series A', 'Series B', 'Series C+', 'Bootstrapped', 'Public'], required: true },
        { id: 5, field: 'employeeCount', label: 'Number of employees', type: 'select',
          options: ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'], required: true },
        { id: 6, field: 'annualRevenue', label: 'Annual revenue range', type: 'select',
          options: ['<$1M', '$1M-$5M', '$5M-$10M', '$10M-$50M', '$50M-$100M', '$100M+'], required: true },
        { id: 7, field: 'fundingStage', label: 'Total funding raised', type: 'text', required: false },
        { id: 8, field: 'primaryIndustry', label: 'Primary industry', type: 'select',
          options: ['SaaS', 'Healthcare', 'FinTech', 'E-commerce', 'EdTech', 'Marketing', 'Sales', 'HR', 'Other'], required: true },
        { id: 9, field: 'secondaryIndustry', label: 'Secondary industry (if applicable)', type: 'text', required: false },
        { id: 10, field: 'companyDescription', label: 'Brief company description (2-3 sentences)', type: 'textarea', required: true }
      ]
    },
    {
      id: 2,
      title: 'Product/Service Information',
      questions: [
        { id: 11, field: 'productName', label: 'Primary product/service name', type: 'text', required: true },
        { id: 12, field: 'productCategory', label: 'Product category', type: 'select',
          options: ['Software', 'Platform', 'Service', 'Consulting', 'Training', 'Hardware', 'Other'], required: true },
        { id: 13, field: 'productDescription', label: 'Product/service description', type: 'textarea', required: true },
        { id: 14, field: 'uniqueValue', label: 'What makes your solution unique?', type: 'textarea', required: true },
        { id: 15, field: 'pricingModel', label: 'Pricing model', type: 'select',
          options: ['Subscription', 'Usage-based', 'One-time', 'Freemium', 'Enterprise', 'Custom'], required: true },
        { id: 16, field: 'averageContractValue', label: 'Average contract value', type: 'select',
          options: ['<$1K', '$1K-$5K', '$5K-$20K', '$20K-$50K', '$50K-$100K', '$100K+'], required: true },
        { id: 17, field: 'salesCycle', label: 'Average sales cycle length', type: 'select',
          options: ['<1 month', '1-3 months', '3-6 months', '6-12 months', '12+ months'], required: true },
        { id: 18, field: 'competitorsList', label: 'List your top 3-5 competitors', type: 'textarea', required: true },
        { id: 19, field: 'competitiveAdvantage', label: 'Key competitive advantages', type: 'textarea', required: true },
        { id: 20, field: 'productMaturity', label: 'Product maturity stage', type: 'select',
          options: ['MVP', 'Early Stage', 'Growth', 'Mature', 'Enterprise-ready'], required: true }
      ]
    },
    {
      id: 3,
      title: 'Current Customer Base',
      questions: [
        { id: 21, field: 'totalCustomers', label: 'Total number of customers', type: 'number', required: true },
        { id: 22, field: 'customerGrowthRate', label: 'Customer growth rate (monthly %)', type: 'number', required: true },
        { id: 23, field: 'customerRetentionRate', label: 'Customer retention rate (%)', type: 'number', required: true },
        { id: 24, field: 'topCustomerIndustries', label: 'Top customer industries (select all)', type: 'multiselect',
          options: ['Technology', 'Healthcare', 'Finance', 'Retail', 'Manufacturing', 'Education', 'Government', 'Other'], required: true },
        { id: 25, field: 'averageCustomerSize', label: 'Average customer company size', type: 'select',
          options: ['SMB (1-100)', 'Mid-market (100-1000)', 'Enterprise (1000+)'], required: true },
        { id: 26, field: 'customerGeography', label: 'Customer geography (select all)', type: 'multiselect',
          options: ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East', 'Africa'], required: true },
        { id: 27, field: 'expansionRate', label: 'Revenue expansion rate from existing customers (%)', type: 'number', required: false },
        { id: 28, field: 'churnRate', label: 'Annual churn rate (%)', type: 'number', required: true },
        { id: 29, field: 'npsScore', label: 'Current NPS score', type: 'number', required: false },
        { id: 30, field: 'customerSuccessStories', label: 'Brief description of 2-3 customer success stories', type: 'textarea', required: true }
      ]
    },
    {
      id: 4,
      title: 'Target Market Definition',
      questions: [
        { id: 31, field: 'targetMarketSize', label: 'Total addressable market size ($)', type: 'text', required: true },
        { id: 32, field: 'targetIndustries', label: 'Target industries (select top 3-5)', type: 'multiselect',
          options: ['Technology', 'Healthcare', 'Finance', 'Retail', 'Manufacturing', 'Education', 'Real Estate', 'Hospitality', 'Other'], required: true },
        { id: 33, field: 'targetCompanySize', label: 'Target company size (select all)', type: 'multiselect',
          options: ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000-5000', '5000+'], required: true },
        { id: 34, field: 'targetGeography', label: 'Target geography (select all)', type: 'multiselect',
          options: ['United States', 'Canada', 'UK', 'Europe', 'Asia Pacific', 'Global'], required: true },
        { id: 35, field: 'targetDepartments', label: 'Target departments', type: 'multiselect',
          options: ['Sales', 'Marketing', 'Engineering', 'Product', 'HR', 'Finance', 'Operations', 'IT', 'Executive'], required: true },
        { id: 36, field: 'targetJobTitles', label: 'Target job titles (list 5-10)', type: 'textarea', required: true },
        { id: 37, field: 'targetSeniority', label: 'Target seniority levels', type: 'multiselect',
          options: ['C-Level', 'VP', 'Director', 'Manager', 'Individual Contributor'], required: true },
        { id: 38, field: 'targetTechStack', label: 'Technologies your target customers use', type: 'textarea', required: false },
        { id: 39, field: 'targetGrowthStage', label: 'Target company growth stage', type: 'multiselect',
          options: ['Startup', 'Scale-up', 'Growth', 'Mature', 'Enterprise'], required: true },
        { id: 40, field: 'targetBudget', label: 'Target customer budget range', type: 'select',
          options: ['<$10K', '$10K-$50K', '$50K-$100K', '$100K-$500K', '$500K+'], required: true }
      ]
    },
    {
      id: 5,
      title: 'Customer Pain Points & Needs',
      questions: [
        { id: 41, field: 'primaryPainPoint', label: 'Primary pain point your product solves', type: 'textarea', required: true },
        { id: 42, field: 'secondaryPainPoints', label: 'Secondary pain points (list 3-5)', type: 'textarea', required: true },
        { id: 43, field: 'currentSolutions', label: 'How are they currently solving this problem?', type: 'textarea', required: true },
        { id: 44, field: 'solutionGaps', label: 'What gaps exist in current solutions?', type: 'textarea', required: true },
        { id: 45, field: 'urgencyLevel', label: 'How urgent is this problem?', type: 'select',
          options: ['Critical - Must solve now', 'High - Within 3 months', 'Medium - Within 6 months', 'Low - Nice to have'], required: true },
        { id: 46, field: 'impactOfNotSolving', label: 'Impact of not solving this problem', type: 'textarea', required: true },
        { id: 47, field: 'desiredOutcomes', label: 'Desired outcomes from a solution', type: 'textarea', required: true },
        { id: 48, field: 'successMetrics', label: 'How do they measure success?', type: 'textarea', required: true },
        { id: 49, field: 'buyingTriggers', label: 'Common buying triggers (select all)', type: 'multiselect',
          options: ['New funding', 'Growth phase', 'Compliance needs', 'Competition', 'Cost reduction', 'Digital transformation', 'Team expansion', 'Crisis event'], required: true },
        { id: 50, field: 'objections', label: 'Common objections or concerns', type: 'textarea', required: true }
      ]
    },
    {
      id: 6,
      title: 'Buyer Personas',
      questions: [
        { id: 51, field: 'championPersona', label: 'Describe your champion persona', type: 'textarea', required: true },
        { id: 52, field: 'championTitle', label: 'Champion typical job title', type: 'text', required: true },
        { id: 53, field: 'championGoals', label: 'Champion\'s main goals', type: 'textarea', required: true },
        { id: 54, field: 'championChallenges', label: 'Champion\'s biggest challenges', type: 'textarea', required: true },
        { id: 55, field: 'decisionMakerPersona', label: 'Describe the decision maker persona', type: 'textarea', required: true },
        { id: 56, field: 'decisionMakerTitle', label: 'Decision maker typical title', type: 'text', required: true },
        { id: 57, field: 'decisionCriteria', label: 'Key decision criteria', type: 'textarea', required: true },
        { id: 58, field: 'influencers', label: 'Who else influences the decision?', type: 'textarea', required: true },
        { id: 59, field: 'buyingCommittee', label: 'Typical buying committee size', type: 'select',
          options: ['1-2 people', '3-5 people', '6-10 people', '10+ people'], required: true },
        { id: 60, field: 'approvalProcess', label: 'Typical approval process', type: 'textarea', required: true }
      ]
    },
    {
      id: 7,
      title: 'Sales & Marketing',
      questions: [
        { id: 61, field: 'leadSources', label: 'Top lead sources (select all)', type: 'multiselect',
          options: ['Inbound', 'Outbound', 'Referrals', 'Partners', 'Events', 'Content', 'Paid ads', 'Social media'], required: true },
        { id: 62, field: 'marketingChannels', label: 'Most effective marketing channels', type: 'multiselect',
          options: ['LinkedIn', 'Google Ads', 'Facebook', 'Email', 'Content/SEO', 'Webinars', 'Podcasts', 'Events'], required: true },
        { id: 63, field: 'contentTypes', label: 'Content that resonates most', type: 'multiselect',
          options: ['Case studies', 'Whitepapers', 'Webinars', 'Blog posts', 'Videos', 'Podcasts', 'Reports', 'Templates'], required: true },
        { id: 64, field: 'messagingThemes', label: 'Key messaging themes that resonate', type: 'textarea', required: true },
        { id: 65, field: 'valueProposition', label: 'Your core value proposition', type: 'textarea', required: true },
        { id: 66, field: 'differentiators', label: 'Top 3 differentiators', type: 'textarea', required: true },
        { id: 67, field: 'socialProof', label: 'Types of social proof that work', type: 'textarea', required: true },
        { id: 68, field: 'salesEnablement', label: 'Key sales enablement needs', type: 'textarea', required: true },
        { id: 69, field: 'partnerChannels', label: 'Partnership opportunities', type: 'textarea', required: false },
        { id: 70, field: 'communityPresence', label: 'Communities where your ICP is active', type: 'textarea', required: true }
      ]
    },
    {
      id: 8,
      title: 'Behavioral & Psychographic',
      questions: [
        { id: 71, field: 'buyingBehavior', label: 'How do they typically buy software?', type: 'textarea', required: true },
        { id: 72, field: 'researchProcess', label: 'Their research and evaluation process', type: 'textarea', required: true },
        { id: 73, field: 'informationSources', label: 'Where they get information', type: 'multiselect',
          options: ['Peer networks', 'Industry publications', 'Analysts', 'Consultants', 'Online reviews', 'Social media', 'Conferences'], required: true },
        { id: 74, field: 'peerInfluence', label: 'Role of peer influence in decisions', type: 'select',
          options: ['Very High', 'High', 'Moderate', 'Low'], required: true },
        { id: 75, field: 'riskTolerance', label: 'Risk tolerance level', type: 'select',
          options: ['Risk-averse', 'Conservative', 'Balanced', 'Risk-tolerant', 'Early adopter'], required: true },
        { id: 76, field: 'innovationAppetite', label: 'Appetite for innovation', type: 'select',
          options: ['Bleeding edge', 'Early adopter', 'Early majority', 'Late majority', 'Laggard'], required: true },
        { id: 77, field: 'brandPreferences', label: 'Brand preferences and values', type: 'textarea', required: true },
        { id: 78, field: 'communicationStyle', label: 'Preferred communication style', type: 'select',
          options: ['Formal/Professional', 'Casual/Friendly', 'Data-driven', 'Story-driven', 'Visual'], required: true },
        { id: 79, field: 'culturalValues', label: 'Key cultural values and beliefs', type: 'textarea', required: true }
      ]
    }
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        navigate('/login');
        return;
      }
      
      setFirebaseUser(currentUser);
      
      try {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUser({
            id: currentUser.uid,
            email: currentUser.email,
            name: userData.fullName,
            company: userData.company,
            ...userData
          });
          
          // Load existing ICP data if it exists
          if (userData.icpData) {
            setFormData(userData.icpData);
          }
          
          // Load current progress
          if (userData.currentSection) {
            setCurrentSection(userData.currentSection);
            setCurrentQuestion(userData.currentQuestion || 1);
          }
          
          // Mark ICP as started
          await updateDoc(doc(db, 'users', currentUser.uid), {
            icpStarted: true,
            icpStartedAt: new Date().toISOString()
          });
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    });
    
    return () => unsubscribe();
  }, [navigate]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMultiSelect = (field, value) => {
    const currentValues = formData[field] || [];
    if (currentValues.includes(value)) {
      handleInputChange(field, currentValues.filter(v => v !== value));
    } else {
      handleInputChange(field, [...currentValues, value]);
    }
  };

  const saveProgress = async () => {
    if (!firebaseUser) return;
    
    setSaving(true);
    try {
      await updateDoc(doc(db, 'users', firebaseUser.uid), {
        icpData: formData,
        lastUpdated: new Date().toISOString(),
        currentSection: currentSection,
        currentQuestion: currentQuestion,
        completedQuestions: calculateCompletedQuestions()
      });
      console.log('Progress saved');
    } catch (error) {
      console.error('Error saving progress:', error);
    } finally {
      setSaving(false);
    }
  };

  const calculateCompletedQuestions = () => {
    let completed = 0;
    sections.forEach(section => {
      section.questions.forEach(question => {
        const value = formData[question.field];
        if (value && (Array.isArray(value) ? value.length > 0 : value.trim() !== '')) {
          completed++;
        }
      });
    });
    return completed;
  };

  const getCurrentSectionQuestions = () => {
    return sections.find(s => s.id === currentSection)?.questions || [];
  };

  const getCurrentQuestion = () => {
    const sectionQuestions = getCurrentSectionQuestions();
    return sectionQuestions[currentQuestion - 1];
  };

  const handleNext = async () => {
    await saveProgress();
    
    const sectionQuestions = getCurrentSectionQuestions();
    
    if (currentQuestion < sectionQuestions.length) {
      setCurrentQuestion(prev => prev + 1);
    } else if (currentSection < sections.length) {
      setCurrentSection(prev => prev + 1);
      setCurrentQuestion(1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(prev => prev - 1);
    } else if (currentSection > 1) {
      setCurrentSection(prev => prev - 1);
      const prevSectionQuestions = sections.find(s => s.id === currentSection - 1)?.questions || [];
      setCurrentQuestion(prevSectionQuestions.length);
    }
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      await updateDoc(doc(db, 'users', firebaseUser.uid), {
        icpData: formData,
        icpCompleted: true,
        icpCompletedAt: new Date().toISOString(),
        completedQuestions: 79
      });
      
      console.log('Questionnaire completed!');
      navigate('/test25-icp'); // Navigate to the ICP results page
      
    } catch (error) {
      console.error('Error submitting questionnaire:', error);
    } finally {
      setSaving(false);
    }
  };

  const isLastQuestion = () => {
    return currentSection === sections.length && 
           currentQuestion === sections[sections.length - 1].questions.length;
  };

  const getTotalProgress = () => {
    let currentQuestionNumber = 0;
    for (let i = 1; i < currentSection; i++) {
      currentQuestionNumber += sections.find(s => s.id === i)?.questions.length || 0;
    }
    currentQuestionNumber += currentQuestion;
    return Math.round((currentQuestionNumber / 79) * 100);
  };

  const renderQuestionInput = (question) => {
    const value = formData[question.field];
    
    switch (question.type) {
      case 'text':
      case 'url':
      case 'number':
        return (
          <input
            type={question.type}
            value={value || ''}
            onChange={(e) => handleInputChange(question.field, e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            placeholder="Your answer..."
            required={question.required}
          />
        );
      
      case 'textarea':
        return (
          <textarea
            value={value || ''}
            onChange={(e) => handleInputChange(question.field, e.target.value)}
            rows={5}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            placeholder="Your answer..."
            required={question.required}
          />
        );
      
      case 'select':
        return (
          <select
            value={value || ''}
            onChange={(e) => handleInputChange(question.field, e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            required={question.required}
          >
            <option value="">Select an option...</option>
            {question.options.map((option, idx) => (
              <option key={idx} value={option}>{option}</option>
            ))}
          </select>
        );
      
      case 'multiselect':
        return (
          <div className="space-y-3">
            {question.options.map((option, idx) => (
              <label key={idx} className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={(value || []).includes(option)}
                  onChange={() => handleMultiSelect(question.field, option)}
                  className="mr-3 h-5 w-5 text-blue-600"
                />
                <span className="text-lg">{option}</span>
              </label>
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading your questionnaire...</p>
        </div>
      </div>
    );
  }

  const currentSectionData = sections.find(s => s.id === currentSection);
  const currentQuestionData = getCurrentQuestion();
  const completedQuestions = calculateCompletedQuestions();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">ICP Questionnaire</h1>
              <p className="text-sm text-gray-600">Building your Ideal Customer Profile</p>
            </div>
            <button
              onClick={() => signOut(auth).then(() => navigate('/login'))}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Question {completedQuestions} of 79
            </span>
            <span className="text-sm font-medium text-gray-700">
              {getTotalProgress()}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${getTotalProgress()}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Section Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                Section {currentSection} of {sections.length}
              </span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-600">
                {currentSectionData?.title}
              </span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Question {currentQuestion} of {getCurrentSectionQuestions().length}
            </h2>
          </div>

          {/* Question */}
          {currentQuestionData && (
            <div className="mb-8">
              <label className="block text-xl font-medium text-gray-800 mb-4">
                {currentQuestionData.label}
                {currentQuestionData.required && (
                  <span className="text-red-500 ml-1">*</span>
                )}
              </label>
              {renderQuestionInput(currentQuestionData)}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={handlePrevious}
              disabled={currentSection === 1 && currentQuestion === 1}
              className={`px-6 py-3 rounded-lg font-medium ${
                currentSection === 1 && currentQuestion === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Previous
            </button>

            <div className="flex items-center gap-4">
              {saving && (
                <span className="text-sm text-gray-500">
                  Saving...
                </span>
              )}
              
              {isLastQuestion() ? (
                <button
                  onClick={handleSubmit}
                  disabled={saving}
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Complete & View ICP
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-600"
                >
                  Next
                </button>
              )}
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="mt-8 pt-8 border-t">
            <p className="text-sm text-gray-600 mb-3">Jump to section:</p>
            <div className="flex flex-wrap gap-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => {
                    setCurrentSection(section.id);
                    setCurrentQuestion(1);
                  }}
                  className={`px-3 py-1 rounded-lg text-sm font-medium ${
                    section.id === currentSection
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {section.id}. {section.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ICPQuestionnaire;