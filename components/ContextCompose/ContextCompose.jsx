export default function ContextCompose(props) {
    const { contexts = [], children } = props
    return (
        <>
            {contexts.reduceRight((acc, Comp) => {
                return <Comp>{acc}</Comp>
            }, children)}
        </>
    )
}