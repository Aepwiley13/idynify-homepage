import React, { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc, query, orderBy, getDoc } from 'firebase/firestore';
import { db } from './lib/firebase';

const AdminDashboard = () => {
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Data State
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCard, setExpandedCard] = useState(null);

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0
  });

  const ADMIN_PASSWORD = '3xkbd84fckv8rc';

  // Authentication
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setAuthError('');
      sessionStorage.setItem('adminAuth', 'true');
    } else {
      setAuthError('Invalid password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('adminAuth');
    setPassword('');
  };

  // Check session on mount
  useEffect(() => {
    if (sessionStorage.getItem('adminAuth') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch requests from Firebase
  const fetchRequests = async () => {
    try {
      setLoading(true);
      const requestsRef = collection(db, 'requests');
      const q = query(requestsRef, orderBy('createdAtTimestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const requestsData = [];
      querySnapshot.forEach((doc) => {
        requestsData.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      setRequests(requestsData);
      calculateStats(requestsData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching requests:', error);
      setLoading(false);
    }
  };

  // Calculate statistics
  const calculateStats = (data) => {
    setStats({
      total: data.length,
      pending: data.filter(r => r.status === 'pending').length,
      approved: data.filter(r => r.status === 'approved').length,
      rejected: data.filter(r => r.status === 'rejected').length
    });
  };

  // Load requests when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchRequests();
    }
  }, [isAuthenticated]);

  // Handle approve/reject
  const updateRequestStatus = async (requestId, newStatus) => {
    try {
      const requestRef = doc(db, 'requests', requestId);
      const signupToken = newStatus === 'approved' ? generateToken() : null;
      
      await updateDoc(requestRef, {
        status: newStatus,
        reviewedAt: new Date().toISOString(),
        signupToken: signupToken
      });
      
      // Refresh data
      fetchRequests();
      
      // Log email info for manual sending (for now)
      const request = requests.find(r => r.id === requestId);
      if (newStatus === 'approved') {
        const signupLink = `https://idynify.com/signup?token=${signupToken}`;
        console.log('📧 SEND APPROVAL EMAIL TO:', request.email || request.fullName);
        console.log('Signup Link:', signupLink);
        alert(`✅ Approved!\n\n📧 Email: ${request.email}\n🔗 Signup Link: ${signupLink}\n\n(Link copied to console)`);
      }
    } catch (error) {
      console.error('Error updating request:', error);
      alert('Error updating status. Check console.');
    }
  };

  // Generate simple token
  const generateToken = () => {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  };

  // Filter and search
  const filteredRequests = requests
    .filter(r => filterStatus === 'all' || r.status === filterStatus)
    .filter(r => 
      searchTerm === '' ||
      r.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.company?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div style={styles.loginContainer}>
        <div style={styles.loginBox}>
          <div style={styles.loginHeader}>
            <span style={styles.loginEmoji}>🐻</span>
            <h2 style={styles.loginTitle}>Mission Control Access</h2>
          </div>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              style={styles.passwordInput}
            />
            {authError && <p style={styles.errorText}>{authError}</p>}
            <button type="submit" style={styles.loginButton}>
              Enter Mission Control 🚀
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Main Dashboard
  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <span style={styles.logo}>🐻</span>
          <h1 style={styles.title}>Mission Control</h1>
        </div>
        <button onClick={handleLogout} style={styles.logoutButton}>
          Logout
        </button>
      </header>

      {/* Stats Dashboard */}
      <div style={styles.statsContainer}>
        <StatCard label="Total" value={stats.total} color="#8b5cf6" />
        <StatCard label="Pending" value={stats.pending} color="#f59e0b" />
        <StatCard label="Approved" value={stats.approved} color="#10b981" />
        <StatCard label="Rejected" value={stats.rejected} color="#ef4444" />
      </div>

      {/* Filters & Search */}
      <div style={styles.controlsContainer}>
        <input
          type="text"
          placeholder="Search by name, email, or company..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
        <div style={styles.filterButtons}>
          {['all', 'pending', 'approved', 'rejected'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              style={{
                ...styles.filterButton,
                ...(filterStatus === status ? styles.filterButtonActive : {})
              }}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Requests List */}
      <div style={styles.requestsList}>
        {loading ? (
          <div style={styles.loadingContainer}>
            <p style={styles.loadingText}>Loading requests...</p>
          </div>
        ) : filteredRequests.length === 0 ? (
          <div style={styles.emptyContainer}>
            <p style={styles.emptyText}>
              {searchTerm || filterStatus !== 'all' 
                ? 'No requests match your filters' 
                : 'No requests yet'}
            </p>
          </div>
        ) : (
          filteredRequests.map(request => (
            <RequestCard
              key={request.id}
              request={request}
              isExpanded={expandedCard === request.id}
              onToggleExpand={() => setExpandedCard(expandedCard === request.id ? null : request.id)}
              onApprove={() => updateRequestStatus(request.id, 'approved')}
              onReject={() => updateRequestStatus(request.id, 'rejected')}
            />
          ))
        )}
      </div>
    </div>
  );
};

// Stats Card Component
const StatCard = ({ label, value, color }) => (
  <div style={styles.statCard}>
    <div style={styles.statValue}>{value}</div>
    <div style={{...styles.statLabel, color}}>{label}</div>
  </div>
);

// Request Card Component
const RequestCard = ({ request, isExpanded, onToggleExpand, onApprove, onReject }) => {
  const statusColors = {
    pending: '#f59e0b',
    approved: '#10b981',
    rejected: '#ef4444'
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Just now';
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Get name - try fullName first, then fall back to name
  const displayName = request.fullName || request.name || 'No name';
  const displayCompany = request.company || 'No company';

  return (
    <div style={styles.requestCard}>
      <div style={styles.requestHeader}>
        <div style={{flex: 1}}>
          <h3 style={styles.requestName}>{displayName}</h3>
          <p style={styles.requestCompany}>
            {displayCompany}
            {request.industry && ` • ${request.industry}`}
          </p>
        </div>
        <span 
          style={{
            ...styles.statusBadge,
            backgroundColor: statusColors[request.status] || '#6b7280'
          }}
        >
          {(request.status || 'pending').toUpperCase()}
        </span>
      </div>

      {/* Basic Details - Always Visible */}
      <div style={styles.requestDetails}>
        <div style={styles.detailRow}>
          <span style={styles.detailLabel}>Email:</span>
          <span style={styles.detailValue}>{request.email || 'No email'}</span>
        </div>
        <div style={styles.detailRow}>
          <span style={styles.detailLabel}>Phone:</span>
          <span style={styles.detailValue}>{request.phone || 'N/A'}</span>
        </div>
        <div style={styles.detailRow}>
          <span style={styles.detailLabel}>Submitted:</span>
          <span style={styles.detailValue}>{formatDate(request.createdAt)}</span>
        </div>
        {request.reviewedAt && (
          <div style={styles.detailRow}>
            <span style={styles.detailLabel}>Reviewed:</span>
            <span style={styles.detailValue}>{formatDate(request.reviewedAt)}</span>
          </div>
        )}
      </div>

      {/* Expanded Details - For Approved Users */}
      {request.status === 'approved' && (
        <>
          <button 
            onClick={onToggleExpand}
            style={styles.expandButton}
          >
            {isExpanded ? '▼ Hide Details' : '▶ View Account Details'}
          </button>
          
          {isExpanded && (
            <div style={styles.expandedSection}>
              <h4 style={styles.expandedTitle}>📊 Account Activity</h4>
              
              <div style={styles.activityGrid}>
                <div style={styles.activityCard}>
                  <div style={styles.activityValue}>
                    {request.loginCount || 0}
                  </div>
                  <div style={styles.activityLabel}>Total Logins</div>
                </div>
                
                <div style={styles.activityCard}>
                  <div style={styles.activityValue}>
                    {request.lastLogin ? '✅' : '❌'}
                  </div>
                  <div style={styles.activityLabel}>
                    {request.lastLogin ? `Last: ${formatDate(request.lastLogin)}` : 'Never Logged In'}
                  </div>
                </div>
                
                <div style={styles.activityCard}>
                  <div style={styles.activityValue}>
                    {request.icpCompleted ? '✅' : request.icpStarted ? '⏳' : '❌'}
                  </div>
                  <div style={styles.activityLabel}>
                    ICP {request.icpCompleted ? 'Completed' : request.icpStarted ? 'In Progress' : 'Not Started'}
                  </div>
                </div>
                
                <div style={styles.activityCard}>
                  <div style={styles.activityValue}>
                    {request.icpProgress || 0}/66
                  </div>
                  <div style={styles.activityLabel}>Questions Answered</div>
                </div>
              </div>

              {request.signupToken && (
                <div style={styles.tokenSection}>
                  <strong>Signup Token:</strong>
                  <code style={styles.tokenCode}>{request.signupToken}</code>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(`https://idynify.com/signup?token=${request.signupToken}`);
                      alert('Signup link copied to clipboard!');
                    }}
                    style={styles.copyButton}
                  >
                    📋 Copy Signup Link
                  </button>
                </div>
              )}

              <div style={styles.actionButtonsRow}>
                <button 
                  onClick={() => window.open(`/dashboard?user=${request.id}`, '_blank')}
                  style={styles.viewAccountButton}
                >
                  🔍 View Full Account
                </button>
                <button 
                  onClick={() => alert('Email functionality coming soon!')}
                  style={styles.sendEmailButton}
                >
                  📧 Send Email
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Action Buttons - For Pending Only */}
      {request.status === 'pending' && (
        <div style={styles.actionButtons}>
          <button 
            onClick={onApprove}
            style={{...styles.actionButton, ...styles.approveButton}}
          >
            ✅ Approve
          </button>
          <button 
            onClick={onReject}
            style={{...styles.actionButton, ...styles.rejectButton}}
          >
            ❌ Reject
          </button>
        </div>
      )}
    </div>
  );
};

// Styles
const styles = {
  // Login Styles
  loginContainer: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  loginBox: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
    width: '400px',
    maxWidth: '90%',
  },
  loginHeader: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  loginEmoji: {
    fontSize: '64px',
    display: 'block',
    marginBottom: '16px',
  },
  loginTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1f2937',
    margin: 0,
  },
  passwordInput: {
    width: '100%',
    padding: '16px',
    fontSize: '16px',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    marginBottom: '12px',
    boxSizing: 'border-box',
  },
  errorText: {
    color: '#ef4444',
    fontSize: '14px',
    marginBottom: '12px',
  },
  loginButton: {
    width: '100%',
    padding: '16px',
    fontSize: '16px',
    fontWeight: '600',
    color: 'white',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },

  // Main Dashboard Styles
  container: {
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: 'white',
    padding: '20px 40px',
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  logo: {
    fontSize: '36px',
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1f2937',
    margin: 0,
  },
  logoutButton: {
    padding: '8px 20px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#6b7280',
    backgroundColor: 'white',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },

  // Stats
  statsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    padding: '40px',
  },
  statCard: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  statValue: {
    fontSize: '36px',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '8px',
  },
  statLabel: {
    fontSize: '14px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },

  // Controls
  controlsContainer: {
    padding: '0 40px 20px',
  },
  searchInput: {
    width: '100%',
    padding: '12px 16px',
    fontSize: '16px',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    marginBottom: '16px',
    boxSizing: 'border-box',
  },
  filterButtons: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
  },
  filterButton: {
    padding: '8px 20px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#6b7280',
    backgroundColor: 'white',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  filterButtonActive: {
    color: 'white',
    backgroundColor: '#8b5cf6',
    borderColor: '#8b5cf6',
  },

  // Requests List
  requestsList: {
    padding: '0 40px 40px',
  },
  loadingContainer: {
    textAlign: 'center',
    padding: '60px 20px',
  },
  loadingText: {
    fontSize: '18px',
    color: '#6b7280',
  },
  emptyContainer: {
    textAlign: 'center',
    padding: '60px 20px',
  },
  emptyText: {
    fontSize: '18px',
    color: '#6b7280',
  },

  // Request Card
  requestCard: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '12px',
    marginBottom: '20px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  requestHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '16px',
  },
  requestName: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#1f2937',
    margin: '0 0 4px 0',
  },
  requestCompany: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0,
  },
  statusBadge: {
    padding: '4px 12px',
    fontSize: '12px',
    fontWeight: '700',
    color: 'white',
    borderRadius: '12px',
  },
  requestDetails: {
    marginBottom: '16px',
  },
  detailRow: {
    display: 'flex',
    gap: '12px',
    marginBottom: '8px',
  },
  detailLabel: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#6b7280',
    minWidth: '100px',
  },
  detailValue: {
    fontSize: '14px',
    color: '#1f2937',
  },

  // Expand Button
  expandButton: {
    width: '100%',
    padding: '12px',
    marginTop: '16px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#8b5cf6',
    backgroundColor: '#f3f4f6',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },

  // Expanded Section
  expandedSection: {
    marginTop: '16px',
    padding: '20px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
  },
  expandedTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1f2937',
    marginTop: 0,
    marginBottom: '16px',
  },
  activityGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '12px',
    marginBottom: '20px',
  },
  activityCard: {
    backgroundColor: 'white',
    padding: '16px',
    borderRadius: '8px',
    textAlign: 'center',
    border: '1px solid #e5e7eb',
  },
  activityValue: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '4px',
  },
  activityLabel: {
    fontSize: '12px',
    color: '#6b7280',
  },
  tokenSection: {
    padding: '16px',
    backgroundColor: 'white',
    borderRadius: '8px',
    marginBottom: '16px',
    border: '1px solid #e5e7eb',
  },
  tokenCode: {
    display: 'block',
    margin: '8px 0',
    padding: '8px',
    backgroundColor: '#f3f4f6',
    borderRadius: '4px',
    fontSize: '12px',
    fontFamily: 'monospace',
    wordBreak: 'break-all',
  },
  copyButton: {
    padding: '8px 16px',
    fontSize: '12px',
    fontWeight: '600',
    color: 'white',
    backgroundColor: '#8b5cf6',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '8px',
  },
  actionButtonsRow: {
    display: 'flex',
    gap: '12px',
  },
  viewAccountButton: {
    flex: 1,
    padding: '12px',
    fontSize: '14px',
    fontWeight: '600',
    color: 'white',
    backgroundColor: '#3b82f6',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  sendEmailButton: {
    flex: 1,
    padding: '12px',
    fontSize: '14px',
    fontWeight: '600',
    color: 'white',
    backgroundColor: '#8b5cf6',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },

  // Action Buttons
  actionButtons: {
    display: 'flex',
    gap: '12px',
    paddingTop: '16px',
    borderTop: '1px solid #e5e7eb',
  },
  actionButton: {
    flex: 1,
    padding: '12px',
    fontSize: '14px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  approveButton: {
    color: 'white',
    backgroundColor: '#10b981',
  },
  rejectButton: {
    color: 'white',
    backgroundColor: '#ef4444',
  },
};

export default AdminDashboard;