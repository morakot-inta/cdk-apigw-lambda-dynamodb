import { AuthService } from "./AuthService";

async function testAuth() {
  const service = new AuthService();
  const loginResult = await service.login(
    "morakot.i@kaopanwa.co.th",
    "7CI@8Qk4"
  );

  const token = await service.getIdToken();
  console.log('Token:', token);
}

testAuth();