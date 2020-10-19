import { PipeTransform, Pipe } from '@angular/core';
import { Course } from 'src/app/models/CourseElements';

@Pipe({ name: 'searchPipeRate' })

export class SearchPipeRate implements PipeTransform {
    transform(courses: Course[], searchTerm: string): Course[] {
        if (!courses)
            return [];
        if (!searchTerm)
            return courses;
        const search = searchTerm.toString();
        return courses.filter(course => {
            var rate: string = "null";
            if (course.rating != null) {
                rate = course.rating.toString()
            }
            return rate.includes(search);
        });
    }
}