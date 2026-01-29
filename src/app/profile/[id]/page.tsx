
const UserProfile = async ({ params }: any) => {
  const { id } = await params;

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>Profile</h1>
      <hr />
      <p className='text-4xl mt-4'>User Profile
        <span className="p-2 ml-2 rounded bg-orange-500 text-white">{id}</span>
      </p>
    </div>
  );
}

export default UserProfile;
