module.exports = {
  apps: [
    {
      name: 'team-1-genics-2024-be',               
      script: 'ts-node src/index.ts',        
      instances: '1',          
      env: {
        NODE_ENV: 'development', 
      },
      env_production: {
        NODE_ENV: 'production',  
      }
    }
  ]
};