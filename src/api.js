function wait(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

export function login(email, password) {
  // Api.post("login", { email, password });
  return wait(2000).then(() => ({ message: "Success" }));
}
