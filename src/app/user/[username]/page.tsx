export default function User({ params }: { params: { username: string } }) {
  return <div>User: {params.username}</div>;
}
