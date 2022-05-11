import { Select, Tooltip } from '@chakra-ui/react'

export default function EngineChoice() {
    return(
    <Select placeholder='text-curie-001'>
        <Tooltip label="I'm option1!">
            <option value='text-davinci-002'>text-davinci-002</option>
        </Tooltip>
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
    )
}
