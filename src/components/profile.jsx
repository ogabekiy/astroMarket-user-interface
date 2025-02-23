"use client"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useGetOneUserQuery, useUpdateOneUserMutation } from "@/redux/api/allApi"
import { User, Mail, Phone, Calendar } from "lucide-react"

export default function Profile() {
  const { data: user, isLoading } = useGetOneUserQuery()
  const [updateUser, { isLoading: isUpdating }] = useUpdateOneUserMutation()

  const [formData, setFormData] = useState({
    firstname: "",
    surname: "",
    email: "",
    phone: "",
    age: "",
  })

  const [originalData, setOriginalData] = useState({})

  useEffect(() => {
    if (user) {
      const userData = {
        firstname: user.firstname || "",
        surname: user.surname || "",
        email: user.email || "",
        phone: user.phone || "",
        age: user.age || "",
      }
      setFormData(userData)
      setOriginalData(userData)
    }
  }, [user])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("Updated data:", formData)
    await updateUser(formData)
  }

  const handleReset = () => {
    setFormData(originalData)
  }

  if (isLoading) return <ProfileSkeleton />

  return (
    <Card className="max-w-4xl mx-auto mt-10 p-6">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Edit Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              icon={<User className="text-gray-400" />}
              label="First Name"
              name="firstname"
              value={formData.firstname}
              originalValue={originalData.firstname}
              onChange={handleChange}
            />
            <InputField
              icon={<User className="text-gray-400" />}
              label="Surname"
              name="surname"
              value={formData.surname}
              originalValue={originalData.surname}
              onChange={handleChange}
            />
            <InputField
              icon={<Mail className="text-gray-400" />}
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              originalValue={originalData.email}
              onChange={handleChange}
            />
            <InputField
              icon={<Phone className="text-gray-400" />}
              label="Phone"
              name="phone"
              type="tel"
              value={formData.phone}
              originalValue={originalData.phone}
              onChange={handleChange}
            />
            <InputField
              icon={<Calendar className="text-gray-400" />}
              label="Age"
              name="age"
              type="number"
              value={formData.age}
              originalValue={originalData.age}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={handleReset} disabled={isUpdating}>
              Cancel
            </Button>
            <Button type="submit" disabled={isUpdating}>
              {isUpdating ? "Updating..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

function InputField({ icon, label, name, type = "text", value, originalValue, onChange }) {
  const hasChanged = value !== originalValue

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{icon}</div>
        <Input
          id={name}
          name={name}
          type={type}
          className={`pl-10 ${hasChanged ? "border-yellow-500" : ""}`}
          value={value}
          onChange={onChange}
        />
        {hasChanged && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <span className="text-yellow-500 text-sm">Changed</span>
          </div>
        )}
      </div>
      {hasChanged && <p className="text-sm text-gray-500">Original: {originalValue}</p>}
    </div>
  )
}

function ProfileSkeleton() {
  return (
    <Card className="max-w-4xl mx-auto mt-10 p-6">
      <CardHeader>
        <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto"></div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
          <div className="flex justify-end space-x-4">
            <div className="h-10 bg-gray-200 rounded w-24"></div>
            <div className="h-10 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

