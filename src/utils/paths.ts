const paths = {
  homePage() {
    return "/";
  },

  room: {
    index() {
      return "/compartimentos";
    },
    store() {
      return "/compartimentos/criar";
    },
    edit(id: string | number) {
      return `/compartimentos/${id}/editar`;
    },
    delete(id: string | number) {
      return `/compartimentos/apagar/${id}`;
    },
  },
  equipment: {
    index() {
      return "/equipamentos";
    },
    store() {
      return "/equipamentos/criar";
    },
    edit(id: string | number) {
      return `/equipamentos/${id}/editar`;
    },
    delete(id: string | number) {
      return `/equipamentos/apagar/${id}`;
    },
  },
  users: {
    index() {
      return "/utilizadores";
    },
    store() {
      return "/utilizadores/criar";
    },
    edit(id: string | number) {
      return `/utilizadores/${id}/editar`;
    },
    delete(id: string | number) {
      return `/utilizadores/apagar/${id}`;
    },
  },
  assignment: {
    index() {
      return "/atribuicoes";
    },
    store() {
      return "/atribuicoes/criar";
    },
    edit(id: string | number) {
      return `/atribuicoes/${id}/editar`;
    },
    delete(id: string | number) {
      return `/atribuicoes/apagar/${id}`;
    },
  },
};

export default paths;
