import * as User from '../models/userModel.js';

export async function index(req, res) {
  res.json(await User.findAll());
}
