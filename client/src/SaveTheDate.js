import './SaveTheDate.css';

import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';

import Typography from '@mui/material/Typography';

const FbImage = (props) => {
    return (
        <div>
            <a href={props.href} target='_blank'>
            <img
            crossOrigin="anonymous"
            src={props.src}
            alt={props.alt}
            className='FbImage'
            />
            </a>
        </div>
    )

}


const relationshipEvents = [
    {
        name: 'We\'re Getting Married!',
        description: '23/09/2023 - Sydney, Australia',
        link: 'https://www.facebook.com/photo.php?fbid=10155438055747081&set=t.652804186&type=3',
        imgLink: 'https://scontent.fsyd4-1.fna.fbcdn.net/v/t31.18172-8/28700768_10155438055747081_4294645537609328069_o.jpg?_nc_cat=104&ccb=1-7&_nc_sid=cdbe9c&_nc_ohc=MGtbglelX_oAX9L1wdw&tn=nl00A9I_Txj3X4ua&_nc_ht=scontent.fsyd4-1.fna&oh=00_AT85OaMJKVCD2unz9GLnFP4b4t1dokdGy4mx8ckVpZ2Y6A&oe=6373831E',
        imgAlt: 'Dave and Tyson are getting married on 23rd September 2023 - Save the date!'
    },
    {
        name: 'Moved back to Sydney',
        description: '06/10/2021',
        link: 'https://www.facebook.com/photo?fbid=10157800061192303&set=pcb.10157800062332303',
        imgLink: 'https://scontent.fsyd4-1.fna.fbcdn.net/v/t39.30808-6/240662887_10157800061187303_4275315789216240346_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=c3Vmahd-5ooAX_tklOs&_nc_ht=scontent.fsyd4-1.fna&oh=00_AT-h85jJtmcTAXUf-JdDUXCZlb456qzEWemtUTl7USCQGw&oe=635420E9',
        imgAlt: 'Dave and Tyson at the beach with Dave\'s nephew Jack'
    },
    {
        name: 'Engaged!',
        description: '04/02/2018',
        link: 'https://www.facebook.com/photo.php?fbid=10155338951177081&set=t.611342080&type=3',
        imgLink: 'https://scontent.fsyd4-1.fna.fbcdn.net/v/t1.18169-9/27545351_10155338951177081_5797742879904030593_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=e2ba7Efi3icAX_d2G6V&_nc_ht=scontent.fsyd4-1.fna&oh=00_AT-vzNmad_1_QEs6QpR-7YElzPQS1yO6JRXn0Z9INcUiDA&oe=6375397C',
        imgAlt: 'Dave & Tyson smiling to camera with the engagement ring'
    },
    {
        name: 'Moved to London',
        description: '01/06/2016',
        link: 'https://www.facebook.com/photo.php?fbid=10154287207312718&set=t.611342080&type=3',
        imgLink: 'https://scontent.fsyd4-1.fna.fbcdn.net/v/t31.18172-8/13443158_10154287207312718_2191716297665783921_o.jpg?_nc_cat=101&ccb=1-7&_nc_sid=730e14&_nc_ohc=61wzMCmMoykAX-DlDaC&_nc_ht=scontent.fsyd4-1.fna&oh=00_AT9t0cdSlPqIt41BLsT4Ffd3AefrlN-nqADwEzAwWqgvdQ&oe=637748A0',
        imgAlt: 'Tyson, Dave, Nat, Joe and Stephen in their Shoreditch apartment'
    },
    {
        name: 'Started dating!',
        description: '21/09/2013',
        link: 'https://www.facebook.com/photo.php?fbid=10151974678449187&set=t.611342080&type=3',
        imgLink: 'https://scontent.fsyd4-1.fna.fbcdn.net/v/t1.18169-9/1378140_10151974678449187_1728793397_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=ba80b0&_nc_ohc=Vsn3KDrVjB8AX8swPCK&_nc_ht=scontent.fsyd4-1.fna&oh=00_AT-qvxwfyFaTHl1WjE01VTMOoUA7878veempriOd3D1C7w&oe=63767C4E',
        imgAlt: 'Dave and Tyson in a ball pit'
    }
]

const SaveTheDate = () => {
    return (
    <div className="SaveTheDate">
    <p className="pinkNeon"><i className="fa-thin fa-rings-wedding fa-2xs"></i> Save the date!</p>
    <p></p>
    <Timeline position="alternate">
        {relationshipEvents.map((event, index) => {
            return (<TimelineItem key={index}>
            <TimelineOppositeContent>
              <FbImage link={event.link} src={event.imgLink} alt={event.imgAlt} />
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector sx={{ height: '100px' }}/>
              <TimelineDot>
              </TimelineDot>
              <TimelineConnector sx={{ height: '200px' }}/>
            </TimelineSeparator>
            <TimelineContent sx={{ mt: 10 }}>
              <Typography variant="h6" component="span">
                {event.name}
              </Typography>
              <Typography>{event.description}</Typography>
            </TimelineContent>
          </TimelineItem>)
        })}
    </Timeline>
</div>
);
}

export default SaveTheDate;