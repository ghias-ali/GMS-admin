import React, { } from 'react';
import { client } from '../../config';

function AdminData() {

    const onclicked = () => {
        console.log("clicked");
        client.service('users').find().then((res) => {
            console.log(res);

        }
        ).catch(e => console.log({ e }));
    };

    return (

        <div>
            <a onClick={onclicked}>data</a>
        </div>


    );
}
export default AdminData;