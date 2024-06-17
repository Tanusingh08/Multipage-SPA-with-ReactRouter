import { useEffect,useState } from 'react';
import { Form,useFetcher } from 'react-router-dom';
import classes from './NewsletterSignup.module.css';

function NewsletterSignup() {
  const [address, setAddress] = useState("");
  const fetcher = useFetcher();
  const { data,state} = fetcher;

  useEffect(()=>{
    if(state === 'idle' && data && data.message){
        window.alert(data.message);

     }
  },[data,state])
 
  return (
    <fetcher.Form method="post" action = '/newsletter' className={classes.newsletter}>
      <input
        type="email"
        onChange={(e) => setAddress(e.target.value)}
        value = {address}
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
       <button onClick={() => setAddress("")}>Sign up</button>
      {/* <button>Sign up</button> */}
    </fetcher.Form>
  );
}

export default NewsletterSignup;