import {useState} from 'react'
import {
    Box, 
    FormControl,
    FormLabel,
    Textarea,
    Button,
    List,
    ListItem,
    ListIcon,
    OrderedList,
    UnorderedList,
    Heading,
    Grid,
    GridItem,
    Text,
    ScaleFade
} from '@chakra-ui/react'
import EngineChoice from './engineChoice'


export default function Form() {
    const [prompt, setPrompt] = useState('')
    // const [result, setResult] = useState('')
    const [results, setResult] = useState([])
// make receivedMessages be an array of JSONs
    //let [textareaValue, setTextareaValue] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {
            prompt: prompt,
        }
        const JSONdata = JSON.stringify(data)
        const endpoint = '/api/openai'
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSONdata,
        }

        // const results = JSON.parse(localStorage.getItem('prompt')) || [];

    //FIXME: If response.status = 200 do this, else give back error
        const openAIResponse = await fetch(endpoint, options)
        const APIJSON = await openAIResponse.json()

        let queryResponseFromAPI = APIJSON.response

        setResult(allResults => [{prompt: prompt, response: queryResponseFromAPI}, ...allResults])

        setPrompt("")


    //FIXME: response.status != 200, then do bad stuff with result (json)

    }
    // const [loading, setLoading] = useState(false)

    // function loadData() {
    //     setLoading({ loading: false })

    //     setTimeout(() => {
    //         setLoading({ loading: true });
    //     }, 1000);

    // }

    return (
        <Box>
            <EngineChoice />
            <form onSubmit={handleSubmit}>
                <FormControl isRequired>
                    <FormLabel htmlFor="prompt">Enter your prompt:</FormLabel>
                    <Textarea 
                    value={prompt}
                    // FIXME: Find Chakra UI's specific name : type="text" 
                    id="prompt" 
                    name="prompt"
                    placeholder="What would you like to ask me?"
                    onChange={event => setPrompt(event.target.value)}
                    required />
                    <Button id="submitButton" my='5' type="submit" >
                        Submit
                    </Button>
                </FormControl>
            </form>
            <Box id="results">
                <Heading as='h2' size='md' mb={5}>Results</Heading>
                <UnorderedList>
                    {/* <ScaleFade initialScale={0.9} in='true'> */}
                    <Box borderRadius='lg'>{results.map (e =>
                            <Grid
                            templateColumns='repeat(4,1fr)'
                            gap={2}
                            mb={5}
                            bg="lavender"
                            borderRadius='lg'
                            p={3}
                            overflow='hidden'
                            boxShadow="lg">

                                <GridItem colSpan={1}>
                                    <Text fontWeight ='bold'>Prompt:</Text>
                                </GridItem>

                                <GridItem colSpan={3} sx={{ whiteSpace: "pre-wrap" }}>
                                    <Text>{e.prompt}</Text>
                                </GridItem>

                                <GridItem colSpan={1}>
                                    <Text fontWeight='bold'>Response:</Text>
                                </GridItem>

                                <GridItem colSpan={3}>
                                    <Text>{e.response}</Text>
                                </GridItem>
                            </Grid>
                        )}
                    </Box>
                    {/* </ScaleFade> */}
                </UnorderedList>
            </Box>            
        </Box>
        
    )
}