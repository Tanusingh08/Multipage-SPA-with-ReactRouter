import { useRouteError } from "react-router-dom";
import PageContent from "../components/PageContent";
import MainNavigation from "../components/MainNavigation";

function ErrorPageHandler() {
  const error = useRouteError();
 
  let title = "An Error Occurred";
  let message = "Sorry something went wrong";

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "Not Found";
    message = " Could not fetch path";
  }
  return (
    <>
       <MainNavigation/>
      <PageContent title={title}> {message} </PageContent>
    </>
  );
}

export default ErrorPageHandler;
