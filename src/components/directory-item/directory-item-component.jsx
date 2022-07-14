import { BackgroundImage,Body,DirectoryitemContainer } from "./directory-item.styles";
import {useNavigate} from 'react-router-dom'



const DirectoryItem = ({category}) => {
    const{imageUrl,title,route} = category;
    const navigate = useNavigate();
    const onNavigateHandler = ()=>navigate(route)
    return (
         
            
            
            <DirectoryitemContainer onClick={onNavigateHandler}>
            
            <BackgroundImage imageUrl={imageUrl} style={{backgroundImage:`url(${imageUrl})`}} />
            <Body>
              <h2>{title}</h2>
              <p>Shop Now</p>
            </Body>
          </DirectoryitemContainer>
       
    );
};


export default DirectoryItem