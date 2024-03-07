// models/produto.js
module.exports = (sequelize, DataTypes) => {
    const Produto = sequelize.define('Produto', {
      nomeProduto: DataTypes.STRING,
      descricao: DataTypes.TEXT,
      preco: DataTypes.DECIMAL(10, 2),
      tipoConteudo: DataTypes.STRING,
      IDHotmart: DataTypes.STRING,
      userId: DataTypes.INTEGER
    }, {});
  
    Produto.associate = function(models) {
      Produto.belongsTo(models.User, { foreignKey: 'userId' });
      Produto.hasMany(models.Entregavel, { foreignKey: 'produtoId' });
      Produto.hasMany(models.Venda, { foreignKey: 'produtoId' });
    };
  
    return Produto;
  };
  