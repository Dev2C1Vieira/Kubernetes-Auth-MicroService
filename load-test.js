import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 100 }, // sobe até 10 users
    { duration: '30s', target: 100 },
    { duration: '10s', target: 0 },  // desce
  ],
};

export default function () {
  http.post('http://localhost:8080/api/auth/login', JSON.stringify({
    email: 'user@example.com',
    password: '1234'
  }), {
    headers: { 'Content-Type': 'application/json' },
  });
  sleep(1);
}
