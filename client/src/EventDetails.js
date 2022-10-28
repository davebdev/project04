import { Box } from '@mui/material/';
import './EventDetails.css';

const EventDetails = () => {



return (
        <Box className="EventDetails" sx={{height: '80vh', width: '90vw', display: 'flex'}}>
            <div className='EventDetailsInner' style={{ flexGrow: 1 }}>
            <h1>Event details</h1>
            <p>The Ceremony will take place at Daltone House Jones Bay Wharf at 4pm</p>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.9662024934023!2d151.1919042155791!3d-33.86476188065722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12ae3e244cd6af%3A0xdd99d39b58909c4f!2sDoltone%20House%20-%20Jones%20Bay%20Wharf!5e0!3m2!1sen!2sau!4v1666871919897!5m2!1sen!2sau" width="600" height="450" sx={{ border: 1}} allowFullScreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </Box>
    )
}

export default EventDetails;