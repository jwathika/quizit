import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Filtered from './Filtered';
const Quiz = ({ categories }) => {
    return (
        <>
            <Filtered categories={categories} />
        </>
    );
};

export default Quiz;
