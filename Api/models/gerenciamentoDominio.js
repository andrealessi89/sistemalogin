// models/gerenciamentodominio.js
module.exports = (sequelize, DataTypes) => {
    const GerenciamentoDominio = sequelize.define('GerenciamentoDominio', {
      tipoDominio: DataTypes.STRING,
      nomeDominio: DataTypes.STRING,
      verificado: DataTypes.BOOLEAN,
      userId: DataTypes.INTEGER
    }, {});
  
    GerenciamentoDominio.associate = function(models) {
      GerenciamentoDominio.belongsTo(models.User, { foreignKey: 'userId' });
    };
  
    return GerenciamentoDominio;
  };
  