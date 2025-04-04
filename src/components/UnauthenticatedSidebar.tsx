import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SignInButton, SignUpButton } from '@clerk/nextjs'
import { Button } from './ui/button'

const UnauthenticatedSidebar = () => (
  <div className="sticky top-20">
    <Card className="h-60">
      <CardHeader>
        <CardTitle className="text-center text-xl font-semibold">
          Welcome!
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-muted-foreground mb-4">
          Login or signup to access your profile and write some notes.
        </p>
        <SignInButton mode="modal">
          <Button className="w-full" variant="outline">
            Login
          </Button>
        </SignInButton>
        <SignUpButton mode="modal">
          <Button className="w-full mt-2" variant="default">
            Sign Up
          </Button>
        </SignUpButton>
      </CardContent>
    </Card>
  </div>
)

export default UnauthenticatedSidebar
