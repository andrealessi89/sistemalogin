// models/acessopainel.js
module.exports = (sequelize, DataTypes) => {
    const AcessoPainel = sequelize.define('AcessoPainel', {
      compradorEmail: DataTypes.STRING,
      produtoId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      credenciaisAcesso: DataTypes.JSON // Armazene informações de acesso, como login/senha
    }, {});
  
    AcessoPainel.associate = function(models) {
      AcessoPainel.belongsTo(models.User, { foreignKey: 'userId' });
      AcessoPainel.belongsTo(models.Produto, { foreignKey: 'produtoId' });
    };
  
    return AcessoPainel;
  };
  