import { Box, Text, Select, Tooltip } from '@chakra-ui/react'
import { useState } from 'react'

export default function EngineChoice() {

    const [value, setValue] = useState('text-curie-002')
    
    return(
        <Box>
            <Select value={value} onChange={(e) => { setValue(e.target.value) }}>
                    <option value='text-curie-002'>text-curie-002</option>
                    <option value='text-davinci-002'>text-davinci-002</option>
                    <option value='text-babbage-001'>text-babbage-001</option>
                    <option value='text-ada-001'>text-ada-001</option>
                    <option value='text-davinci-001'>text-davinci-001</option>
                    <option value='davinci-instruct-beta'>davinci-instruct-beta</option>
                    <option value='davinci'>davinci</option>
                    <option value='curie-instruct-beta'>curie-instruct-beta</option>
                    <option value='curie'>curie</option>
                    <option value='babbage'>babbage</option>
                    <option value='ada'>ada</option>
            </Select>
            <Text>value is {value}</Text>
        </Box>
    )
}
