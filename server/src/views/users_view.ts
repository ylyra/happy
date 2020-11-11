import User from '../models/User';

export default {
  render(usuario: User) {
    return {
      token:usuario.token,
      user: {
        name:usuario.name,
        email: usuario.email,
      }
    }
  },    
  renderMany(users: User[]) {
    return users.map(user => this.render(user))
  }
}