// our-domain.com/meetupId
import Head from 'next/head'
import { MongoClient, ObjectId } from 'mongodb'
import MeetupDetail from '../../components/meetups/MeetupDetail'

const MeetupDetails = (props) => {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name='description' content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
  )
}

export async function getStaticPaths() {
  const client = await MongoClient.connect('mongodb+srv://Alan:soyalan0502@cluster0.smp3m.mongodb.net/meetups?retryWrites=true&w=majority'); // connect database
  const db = client.db();

  const meetupsCollection = db.collection('meetupsCollection');

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: 'blocking',
    paths: meetups.map(meetup => (
      { params: { meetupId: meetup._id.toString() } }
    )),
  }
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect('mongodb+srv://Alan:soyalan0502@cluster0.smp3m.mongodb.net/meetups?retryWrites=true&w=majority'); // connect database
  const db = client.db();

  const meetupsCollection = db.collection('meetupsCollection');

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId)
  });

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
    }
  }
}

export default MeetupDetails
