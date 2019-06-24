import * as Yup from 'yup';

export default Yup.object().shape({
    title: Yup.string()
        .max(50, 'Please enter no more than 50 characters')
        .min(2, 'Please enter no less than 2 characters')
        .required('Please enter task title'),
    shortDescription: Yup.string()
        .max(100, 'Please enter no more than 100 characters'),
    shortDescription: Yup.string()
        .max(500, 'Please enter no more than 500 characters'),   
})