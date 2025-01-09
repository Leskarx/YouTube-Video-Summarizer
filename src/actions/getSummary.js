import axios from 'axios';
export async function getSummary(transcript) {

    const options = {
        method: 'POST',
        url: 'https://n8n-dev.subspace.money/webhook/21ad7b8a-60af-4c00-9a37-b379442ebbff',
        
        data: {
            transcript: transcript,
          
        }
      };
      
      try {
          const response = await axios.request(options);
          console.log('response...........get summary:', response);
          return response.data.summary;
         
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
