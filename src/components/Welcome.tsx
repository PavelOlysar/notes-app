import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { BookMarked } from 'lucide-react'

function Welcome() {
  return (
    <Card className="max-w-2xl w-full h-60">
      <CardHeader className="text-center space-y-4">
        <div className="flex justify-center">
          <BookMarked className="h-12 w-12 text-primary" />
        </div>
        <CardTitle className="text-3xl">Welcome to Notes App</CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-2 text-muted-foreground">
        <p>Your personal space for capturing thoughts and ideas.</p>
        <p>Sign in to start creating notes and organizing your thoughts.</p>
      </CardContent>
    </Card>
  )
}

export default Welcome
