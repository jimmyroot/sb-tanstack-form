export function validateUserName(username: string) {
  return new Promise<Boolean>((resolve) => {
    // console.log("validating username: " + username);
    setTimeout(() => {
      resolve(
        !["foo", "bar", "baz"].includes(username)
        //   ? "Username already taken"
        //   : undefined
      );
    }, 1000);
  });
}
