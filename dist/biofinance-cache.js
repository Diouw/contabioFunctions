(function (global) {

  const Biofinance = global.Biofinance || {};

  // ================= CACHE =================

  Biofinance.salvarCache = function (pagina, email, contaID, data) {
    try {
      const chave = `cache_${pagina}_${email}_${contaID}`;

      const cacheData = {
        data: data,
        timestamp: data.timestamp || Date.now()
      };

      localStorage.setItem(chave, JSON.stringify(cacheData));
      console.log("Cache salvo:", chave);
    } catch (error) {
      console.error("Erro ao salvar cache:", error);
    }
  };

  Biofinance.lerCache = function (pagina, email, contaID) {
    try {
      const chave = `cache_${pagina}_${email}_${contaID}`;
      const cacheString = localStorage.getItem(chave);

      if (!cacheString) return null;

      const cacheData = JSON.parse(cacheString);

      const tempoDecorrido = Date.now() - cacheData.timestamp;
      const LIMITE = 7 * 60 * 1000;

      if (tempoDecorrido > LIMITE) {
        Biofinance.limparCache(pagina, email, contaID);
        return null;
      }

      return cacheData.data;

    } catch (error) {
      console.error("Erro ao ler cache:", error);
      return null;
    }
  };

  Biofinance.limparCache = function (pagina, email, contaID) {
    try {
      const chave = `cache_${pagina}_${email}_${contaID}`;
      localStorage.removeItem(chave);
      console.log("Cache removido:", chave);
    } catch (error) {
      console.error("Erro ao limpar cache:", error);
    }
  };

  // ================= EXPORT =================

  global.Biofinance = Biofinance;

})(window);