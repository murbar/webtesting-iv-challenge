let users = [
  { id: 1, username: 'Joel' },
  { id: 2, username: 'Adam' },
  { id: 3, username: 'Jonathan' },
  { id: 4, username: 'Ian' },
  { id: 5, username: 'Victor' },
  { id: 6, username: 'Christopher' },
  { id: 7, username: 'Frank' },
  { id: 8, username: 'Omar' }
];

module.exports = {
  getAll: () => users,
  getById: id => {
    found = users.filter(u => u.id === id);
    return found.length ? found[0] : null;
  },
  create: user => {
    const id = users[users.length - 1].id + 1;
    users.push({ id, username: user.username });
    return users[users.length - 1];
  },
  delete: id => {
    const existing = users.find(u => u.id === id);
    users = users.filter(u => u.id !== id);
    return !!existing;
  }
};
