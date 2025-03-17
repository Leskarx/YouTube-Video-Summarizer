import axios from 'axios';
export async function getSummary(transcript) {

    const options = {
        method: 'POST',
        url: 'https://youtube-summarizer-backend-leskar.vercel.app/summary',
        
        data: {
            text: transcript,
          
        }
      };
      
      try {
          const response = await axios.request(options);
          console.log('response...........get summary:', response);
          return response.data.message;
         
      } catch  {
       throw new Error('Failed to summarize the transcript');
      }
        
    }




// export async function getSummary(transcript) {

// const options = {
//     method: 'POST',
//     url: 'https://gpt-summarization.p.rapidapi.com/summarize',
//     headers: {
//       'x-rapidapi-key':\import.meta.env.VITE_SUMMARY_KEY,
//       'x-rapidapi-host': 'gpt-summarization.p.rapidapi.com',
//       'Content-Type': 'application/json'
//     },
//     data: {
//       text: transcript,
//       num_sentences: 3
//     }
//   };
  
//   try {
//       const response = await axios.request(options);
//       return response.data.summary;
     
//   } catch  {
//    throw new Error('Failed to summarize the transcript');
//   }
    
// }
 // Call the function to test it out
