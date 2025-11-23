[build]
  command = "npm run build"
  publish = "dist"

[functions]
  directory = "netlify/functions"
  node_bundler = "esbuild"

[dev]
  functions = "netlify/functions"
  functionsPort = 8888
  
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[functions."generate-icp"]
  timeout = 900