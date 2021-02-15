import Layout, { Content, Header } from "antd/lib/layout/layout";
import Navbar from "../components/nav_bar";

const ConditionalLayout=({displaySearchBar,children})=>{        
    return(
        <Layout
            style={{
                backgroundColor:"#fff"
            }}
        >
            <Content>
            <Navbar displaySearchBar={displaySearchBar}/>
                {children}
            </Content>
        </Layout>
    )
};

export default ConditionalLayout;