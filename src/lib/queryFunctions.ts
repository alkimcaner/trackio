export const getUser = () => fetch("/api/user").then((res) => res.json());
