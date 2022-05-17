import {useState} from 'react'
import {
    Box, 
    FormControl,
    FormLabel,
    Textarea,
    Button,
    Heading,
    Grid,
    GridItem,
    Text,
    Select,
    Flex,
    Spacer
} from '@chakra-ui/react'
import { DotPulse } from '@uiball/loaders'


export default function Form() {
    const [engineChoice, setEngineChoice] = useState('text-curie-001')
    const [prompt, setPrompt] = useState('')
    const [results, setResult] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [visibility, setIsVisible] = useState('none')

    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)

        const data = {
            prompt: prompt,
            value: engineChoice
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
            setIsVisible('block')
            setResult(allResults => [{ value: engineChoice, prompt: prompt, response: queryResponseFromAPI }, ...allResults])
            setPrompt("")
        } else {
            alert("Oops! We have a " + openAIResponse.status + ' Error: ' + queryResponseFromAPI)
        }
        setIsLoading(false)
    }
    
    return (
        <Box>
            <Box>
                <FormControl>
                    <FormLabel pt="8px" htmlFor='engineSelection'>Select your OpenAI engine:</FormLabel>
                <Select id='engineSelection' bg="white" color='black' value={engineChoice} onChange={(e) => { setEngineChoice(e.target.value) }}>
                    <option value='text-curie-001'>text-curie-001</option>
                    <option value='text-davinci-002'>text-davinci-002</option>
                    <option value='text-babbage-001'>text-babbage-001</option>
                    <option value='text-ada-001'>text-ada-001</option>
                    <option value='text-davinci-001'>text-davinci-001</option>
                </Select>
                </FormControl>
            </Box>
            <form onSubmit={handleSubmit}>
                <FormControl isRequired>
                    <FormLabel pt="8px" htmlFor="prompt">Enter your prompt:</FormLabel>
                    <Textarea 
                    value={prompt}
                    id="prompt" 
                    name="prompt"
                    placeholder="What would you like to ask me?"
                    onChange={event => setPrompt(event.target.value)}
                    bg="white"
                    color='black'
                    required />

                    <Flex>
                        <Spacer />
                        <Button 
                        id="submitButton" 
                        my='5' 
                        type="submit" 
                        bg="#5e59fd"
                        sx={{ _disabled: { opacity: 1 } }}
                        _hover={{ bg: '#5f59fd8b' }}
                        isLoading={isLoading}
                        spinner={
                        <DotPulse 
                        size={40}
                        speed={1.2} 
                        color="#3211eea7" 
                        />}
                        >
                        Submit
                        </Button>
                    </Flex>
                </FormControl>
            </form>
            <Box id="results">
                <Heading as='h2' size='md' display={visibility} >Results</Heading>
                    <Box borderRadius='lg'>{results.map (e =>
                            <Grid
                            templateColumns='repeat(4,1fr)'
                            gap={2}
                            my={5}
                            bg="#ffffff39"
                            borderRadius='lg'
                            p={3}
                            overflow='hidden'
                            boxShadow="lg"
                            align-items='center'>
                                <GridItem colSpan={1}>
                                    <Text fontWeight='bold'>Engine:</Text>
                                </GridItem>
                                <GridItem colSpan={3} sx={{ whiteSpace: "pre-wrap" }}>
                                    <Text>{e.value}</Text>
                                </GridItem>
                                
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
            </Box>            
        </Box>
        
    )
}