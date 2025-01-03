import axios from 'axios';

export async function postToSocialMedia(content: string) {
  try {
    const response = await axios.post(
      'https://api.socialmedia.com/post',
      { content },
      { headers: { Authorization: `Bearer ${process.env.SOCIAL_MEDIA_API_KEY}` } }
    );
    return response.data;
  } catch (error) {
    console.error('Failed to post to social media:', error);
    throw new Error('Social Media Post Failed');
  }
}
