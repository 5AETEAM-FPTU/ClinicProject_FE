'use client'
import { CirclePlus, CircleX } from 'lucide-react'
import Image from 'next/image'
import { Component, ReactNode, SetStateAction, useState } from 'react'
import { motion } from 'framer-motion'

interface Props {
    fileStorage: FileList
    setFileStorage: React.Dispatch<SetStateAction<FileList | null>>
    removeItemFromStorage: (index: number) => void
}
interface State {}

class MessageFileShower extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {}
    }
    shouldComponentUpdate(nextProps: Props, nextState: State) {
        if (this.props.fileStorage !== nextProps.fileStorage) {
            return true
        }
        return false
    }
    render(): ReactNode {
        return (
            <>
                {this.props.fileStorage.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        className="dark:bg-thirdDark absolute bottom-[60px] flex h-[fit] w-fit max-w-[50%] flex-wrap items-center justify-between gap-2 rounded-lg bg-white p-4 shadow-third sm:max-w-[80%]"
                    >
                        <div>
                            <label htmlFor="image-input">
                                <div className="hover:animate-wiggle flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-lg bg-slate-200">
                                    <CirclePlus className="text-secondarySupperDarker" />
                                </div>
                            </label>
                        </div>
                        {Array.from(this.props.fileStorage).map(
                            (item: File, index: number) => (
                                <div key={index} className="relative">
                                    {item.type.includes('image') ? (
                                        <div>
                                            <Image
                                                src={URL.createObjectURL(item)}
                                                alt="image"
                                                width={200}
                                                height={200}
                                                className="h-[50px] w-[50px] rounded-md object-cover"
                                            ></Image>
                                        </div>
                                    ) : (
                                        <div className="w-fit max-w-[150px] rounded-md bg-[#c4c4c4] p-3 dark:bg-black">
                                            <h3>{item.name}</h3>
                                        </div>
                                    )}
                                    <button
                                        className="absolute -right-1 -top-1 flex h-[20px] w-[20px] items-center justify-center rounded-full bg-black dark:bg-white"
                                        onClick={() => {
                                            this.props.removeItemFromStorage(
                                                index,
                                            )
                                        }}
                                    >
                                        <CircleX className="text-secondarySupperDarker" />
                                    </button>
                                </div>
                            ),
                        )}
                    </motion.div>
                )}
            </>
        )
    }
}
export default MessageFileShower
