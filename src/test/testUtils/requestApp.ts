import request from 'supertest';
import app from '../../app';

export const requestApp = request(app);

export default {};
