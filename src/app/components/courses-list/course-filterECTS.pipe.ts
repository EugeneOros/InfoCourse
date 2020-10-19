import { PipeTransform, Pipe } from '@angular/core';
import { Course } from 'src/app/models/CourseElements';

@Pipe({ name: 'searchPipeECTS' })

export class SearchPipeECTS implements PipeTransform {
    transform(courses: Course[], searchTermECTS: string): Course[] {
        if (!courses)
            return [];
        if (!searchTermECTS)
            return courses;
        const search = searchTermECTS.toString();
        return courses.filter(course => {
            return course.ECTS.toString().includes(search);
        });
    }
}