module.exports = {
  apps : [{
    script: 'npm start',
  }],

  deploy : {
    production : {
      key: 'EC2-NEXT.pem',
      user : 'ubuntu',
      host : 'ec2-54-197-79-29.compute-1.amazonaws.com',
      ref  : 'origin/master',
      repo : 'https://github.com/Adrichard14/aneel-tarifas-front',
      path : '/home/ubuntu',
      'pre-deploy-local': '',
      'post-deploy' : 'source ~/.nvm/nvm.sh && npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
      'ssh-options': 'FowardAgent=yes',
    }
  }
};
