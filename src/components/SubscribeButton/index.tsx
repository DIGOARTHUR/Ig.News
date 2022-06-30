

import { useSession, signIn } from "next-auth/react";
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss';

interface SubscriberButtonProps {
    priceId: string;
}

export function SubscribeButton({ priceId }: SubscriberButtonProps) {

    const {data:session} = useSession()

    async function handleSubscriber() {
        if (!session) {
            signIn('github')
            return;
        }

        //criação da checkout session
        try {
            const response = await api.post('/subscribe')

            const { sessionId } = response.data;

            const stripe = await getStripeJs();

           await  stripe.redirectToCheckout({sessionId})

        }catch(err){
            alert(err.message)
        }
    } 

    return (
        <button type="button" className={styles.subscribeButton}
            onClick={handleSubscriber}
        >
            Subscribe Now
        </button>
    )
}