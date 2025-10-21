import http from "k6/http";
import { sleep } from "k6";

export const options = {
  stages: [
    { duration: "10s", target: 8000 }, // sobe até 10 users
    { duration: "30s", target: 5000 },
    { duration: "10s", target: 0 }, // desce
  ],
};

export default function () {
  const email = `user+${__VU}_${__ITER}@example.com`;
  const payload = JSON.stringify({
    nome: "Test User",
    email,
    password: "1234",
    tipoFuncionarioId: 1,
  });

  http.post("http://localhost:8080/api/auth/register", payload, {
    headers: { "Content-Type": "application/json" },
  });

  sleep(1);
}
