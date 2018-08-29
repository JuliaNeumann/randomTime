exports.userMixin = {
  data() {
    return {
      user: ''
    };
  },
  watch: {
    user: function () {
      localStorage.setItem('rt-user', this.user)
    }
  },
  mounted: function () {
    if (localStorage.getItem('rt-user')) {
      this.user = localStorage.getItem('rt-user')
    }
  }
};
