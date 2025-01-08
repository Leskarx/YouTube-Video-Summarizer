import axios from 'axios';

export async function getTranscript(url) {
  try {
    // Extract videoId from the URL
    const urlObj = new URL(url);
    const videoId = urlObj.searchParams.get('v'); // Get the 'v' parameter from the URL

    if (!videoId) {
      throw new Error('Invalid YouTube URL: Missing videoId');
    }

    const options = {
      method: 'GET',
      url: 'https://youtube-transcripts.p.rapidapi.com/youtube/transcript',
      params: {
        url: url,
        videoId: videoId, // Use the extracted videoId here
        chunkSize: '500',
      },
      headers: {
        'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY, // API Key from environment
        'x-rapidapi-host': 'youtube-transcripts.p.rapidapi.com',
      },
    };

    const response = await axios.request(options);
    const arrayOfText = response.data.content;

    // Use map and join to efficiently construct the transcript
    const transcript = arrayOfText.map((item) => item.text).join(' ');

    console.log('Optimized Transcript Data:', transcript);
    return transcript;
  } catch (error) {
    console.error('Error fetching transcript:', error);
    throw error;
  }
}
