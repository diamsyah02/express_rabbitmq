const ModuleAlias = require('module-alias')

ModuleAlias.addAliases({
  "@helpers" : `${__dirname}/helpers`,
  "@configs" : `${__dirname}/configs`,
  "@rabbits"  : `${__dirname}/rabbits`,
  "@controllers"  : `${__dirname}/controllers`,
  "@services"  : `${__dirname}/services`,
  "@repositories"  : `${__dirname}/repositories`,
})