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
    ScaleFade,
} from '@chakra-ui/react'
import { DotPulse } from '@uiball/loaders'
import EngineChoice from './engineChoice'


export default function Form() {
    const [prompt, setPrompt] = useState('')
    const [results, setResult] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)

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
        
        const openAIResponse = await fetch(endpoint, options)
        const APIJSON = await openAIResponse.json()

        let queryResponseFromAPI = APIJSON.response

        if (openAIResponse.status == 200) {
            setResult(allResults => [{ prompt: prompt, response: queryResponseFromAPI }, ...allResults])
            setPrompt("")
        } else {
            alert("Oops! We have a " + openAIResponse.status + ' Error: ' + queryResponseFromAPI)
        }
        setIsLoading(false)
    }
    
    return (
        <Box>
            <EngineChoice />
            <form onSubmit={handleSubmit}>
                <FormControl isRequired>
                    <FormLabel htmlFor="prompt">Enter your prompt:</FormLabel>
                    <Textarea 
                    value={prompt}
                    id="prompt" 
                    name="prompt"
                    placeholder="What would you like to ask me?"
                    onChange={event => setPrompt(event.target.value)}
                    required />
                    <Button 
                    id="submitButton" 
                    my='5' 
                    type="submit" 
                    bg="tomato"
                    _hover={{ bg: 'pink' }}
                    isLoading={isLoading}
                    spinner={
                        <DotPulse 
                        size={40}
                        speed={1.2} 
                        color="blue" 
                        />}
                    >
                    Submit
                    </Button>
                </FormControl>
            </form>
            <Box id="results">
                <Heading as='h2' size='md' mb={5}>Results</Heading>
                <UnorderedList>
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
                </UnorderedList>
            </Box>            
        </Box>
        
    )
}