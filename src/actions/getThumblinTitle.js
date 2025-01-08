import axios from "axios";

async function getYouTubeThumbnailAndTitle(videoUrl) {
    try {
        // Extract the video ID from the URL
        const urlObj = new URL(videoUrl);
        const videoId = urlObj.searchParams.get('v');
        if (!videoId) {
            throw new Error('Invalid YouTube URL');
        }

        // Your YouTube Data API key
        const apiKey = 'AIzaSyD3Ou-xpDkM1tFB1dagmzlygy-e1Y3sv5o';

        // YouTube Data API endpoint
        const apiEndpoint = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`;

        // Make the API request
        const response = await axios.get(apiEndpoint);

        // Check if the video exists
        if (response.data.items.length === 0) {
            throw new Error('Video not found');
        }

        // Extract the thumbnail URL and title
        const snippet = response.data.items[0].snippet;
        const thumbnails = snippet.thumbnails;
        const thumbnailUrl = thumbnails.maxres.url; // You can choose 'default', 'medium', 'high', 'standard', or 'maxres' based on availability
        const videoTitle = snippet.title;

        console.log('Thumbnail URL:', thumbnailUrl);
        console.log('Video Title:', videoTitle);

        return { thumbnailUrl, videoTitle };
    } catch (error) {
        console.error('Error fetching video details:', error.message);
    }
}

export default getYouTubeThumbnailAndTitle;
// Example usage
// getYouTubeThumbnailAndTitle('https://www.youtube.com/watch?v=Lj5fyDX01v8')
//     .then(({ thumbnailUrl, videoTitle }) => {
//         console.log('Fetched Details:');
//         console.log('Thumbnail URL:', thumbnailUrl);
//         console.log('Video Title:', videoTitle);
//     });
