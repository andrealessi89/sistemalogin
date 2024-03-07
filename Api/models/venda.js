// models/venda.js
module.exports = (sequelize, DataTypes) => {
    const Venda = sequelize.define('Venda', {
      compradorEmail: DataTypes.STRING,
      status: DataTypes.STRING,
      dataVenda: DataTypes.DATE,
      produtoId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER
    }, {});
  
    Venda.associate = function(models) {
      Venda.belongsTo(models.User, { foreignKey: 'userId' });
      Venda.belongsTo(models.Produto, { foreignKey: 'produtoId' });
    };
  
    return Venda;
  };
  