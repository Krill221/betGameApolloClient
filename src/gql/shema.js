import { gql } from '@apollo/client';

export const S_USERS = gql`
subscription users {
    users {
        id
        name
        points
        multi
    }
}
`;
export const S_MESSAGES = gql`
subscription messages {
    messages {
        id
        name
        text
    }
}
`;
export const S_ROUND = gql`
subscription Round($name: String!) {
    round(name: $name) {
        id
        top
        status
        speed
        points
        bets {
            id
            name
            bet
            multi
            win
            score
        }
    }
}
`;

export const QUERY_USERS = gql`
query Query {
    users {
        id
        name
        points
    }
}
`;

export const M_LOGIN = gql`
mutation Login($name: String!) {
    login(name: $name) {
        id
        name
        points
        multi
    }
}
`;

export const M_START_ROUND = gql`
mutation StartRound($name: String!, $points: String!, $multi: String!, $speed: String!) {
    startRound(name: $name, points: $points, multi: $multi, speed: $speed )
}
`;

export const M_END_ROUND = gql`
mutation EndRound($name: String!) {
    endRound(name: $name)
}
`;

export const M_POST_MESSAGE = gql`
mutation($name:String!, $text:String!){
    postMessage(name: $name, text: $text)
}
`;
