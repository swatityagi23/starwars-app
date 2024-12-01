import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
      <div className="flex items-center justify-center text-center">
        <div>
          <h2 className="text-5xl m-4">404</h2>
          <p>Page Not Found</p>
          <p>The page you're looking for does not exist.</p>
          <hr className="bg-white h-px my-3" />
          <Link to="/" className="text-yellow-200">
            Go Back To Character List
          </Link>
        </div>
      </div>
    </>
  );
};
export default NotFound;
